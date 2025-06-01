import { preorders, type Preorder, type InsertPreorder } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createPreorder(preorder: InsertPreorder, discountCode: string): Promise<Preorder>;
  getPreorderByEmail(email: string): Promise<Preorder | undefined>;
  getPreorderByCode(code: string): Promise<Preorder | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createPreorder(insertPreorder: InsertPreorder, discountCode: string): Promise<Preorder> {
    const [preorder] = await db
      .insert(preorders)
      .values({
        name: insertPreorder.name,
        email: insertPreorder.email,
        preferredScent: insertPreorder.preferredScent || null,
        discountCode,
        newsletter: insertPreorder.newsletter || false,
      })
      .returning();
    return preorder;
  }

  async getPreorderByEmail(email: string): Promise<Preorder | undefined> {
    const [preorder] = await db.select().from(preorders).where(eq(preorders.email, email));
    return preorder || undefined;
  }

  async getPreorderByCode(code: string): Promise<Preorder | undefined> {
    const [preorder] = await db.select().from(preorders).where(eq(preorders.discountCode, code));
    return preorder || undefined;
  }
}

export const storage = new DatabaseStorage();
