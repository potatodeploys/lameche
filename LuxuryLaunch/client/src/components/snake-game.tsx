import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SnakeGameProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Position {
  x: number;
  y: number;
}

export default function SnakeGame({ isOpen, onClose }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [snake, setSnake] = useState<Position[]>([{ x: 200, y: 200 }]);
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
  const [food, setFood] = useState<Position>({ x: 100, y: 100 });
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400;

  const generateFood = useCallback((): Position => {
    return {
      x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)) * GRID_SIZE,
      y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)) * GRID_SIZE,
    };
  }, []);

  const resetGame = useCallback(() => {
    setSnake([{ x: 200, y: 200 }]);
    setDirection({ x: 0, y: 0 });
    setFood(generateFood());
    setScore(0);
    setGameRunning(false);
  }, [generateFood]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with dark background
    ctx.fillStyle = '#0f1419';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake with glow effect
    ctx.shadowColor = '#2dd4bf';
    ctx.shadowBlur = 10;
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#2dd4bf' : '#1a7f78';
      ctx.fillRect(segment.x, segment.y, GRID_SIZE - 2, GRID_SIZE - 2);
    });

    // Draw food with different glow
    ctx.shadowColor = '#c7b9ff';
    ctx.fillStyle = '#c7b9ff';
    ctx.fillRect(food.x, food.y, GRID_SIZE - 2, GRID_SIZE - 2);

    // Reset shadow
    ctx.shadowBlur = 0;
  }, [snake, food]);

  const moveSnake = useCallback(() => {
    if (!gameRunning) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= CANVAS_SIZE || head.y < 0 || head.y >= CANVAS_SIZE) {
        setGameRunning(false);
        if (score > 50) {
          toast({
            title: "Amazing!",
            description: "You found our secret game! 🐍",
          });
        }
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameRunning(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameRunning, direction, food, score, generateFood, toast]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameRunning) return;

    const key = e.key.toLowerCase();
    
    switch(key) {
      case 'w':
      case 'arrowup':
        if (direction.y === 0) {
          setDirection({ x: 0, y: -GRID_SIZE });
        }
        break;
      case 's':
      case 'arrowdown':
        if (direction.y === 0) {
          setDirection({ x: 0, y: GRID_SIZE });
        }
        break;
      case 'a':
      case 'arrowleft':
        if (direction.x === 0) {
          setDirection({ x: -GRID_SIZE, y: 0 });
        }
        break;
      case 'd':
      case 'arrowright':
        if (direction.x === 0) {
          setDirection({ x: GRID_SIZE, y: 0 });
        }
        break;
    }
    e.preventDefault();
  }, [gameRunning, direction]);

  const startGame = () => {
    resetGame();
    setGameRunning(true);
    setDirection({ x: GRID_SIZE, y: 0 });
  };

  // Game loop
  useEffect(() => {
    if (gameRunning) {
      gameLoopRef.current = setInterval(moveSnake, 150);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameRunning, moveSnake]);

  // Drawing
  useEffect(() => {
    draw();
  }, [draw]);

  // Keyboard controls
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, handleKeyPress]);

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      resetGame();
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }
  }, [isOpen, resetGame]);

  if (!isOpen) return null;

  return (
    <div className="snake-game-overlay fixed inset-0 z-50 flex items-center justify-center active">
      <div className="game-container text-center text-white max-w-lg mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-3xl font-bold text-primary">🐍 La Mèche Snake</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-muted-foreground hover:text-white"
          >
            ✕
          </Button>
        </div>
        
        <div className="text-xl mb-4" style={{color: 'hsl(var(--lavender-mist))'}}>
          Score: <span className="font-bold">{score}</span>
        </div>
        
        <canvas
          ref={canvasRef}
          className="game-canvas mx-auto mb-6"
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
        />
        
        <div className="space-y-4">
          <div className="space-x-4">
            <Button
              onClick={startGame}
              className="glass-button px-6 py-2"
            >
              {gameRunning ? 'Restart Game' : 'Start Game'}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="glass-button px-6 py-2"
            >
              Close
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Use WASD or Arrow Keys to control the snake
          </p>
          
          {!gameRunning && score > 0 && (
            <div className="success-message rounded-lg p-4 mt-4">
              <p className="font-semibold">Game Over!</p>
              <p className="text-sm">Final Score: {score}</p>
              {score > 50 && <p className="text-sm">🎉 Excellent score!</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
