import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!canvasRef.current || !inView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;
    }> = [];

    // Create particles with different colors
    const colors = ["#6666ff", "#ff6666", "#66ff66", "#ffff66"];
    for (let i = 0; i < 100; i++) { // Increased number of particles
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1, // Increased size
        dx: (Math.random() - 0.5) * 2, // Increased speed
        dy: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      setTimeout(() => isMouseMoving = false, 100);
    }

    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Increased trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + "cc"; // Increased opacity
        ctx.fill();

        // Update position
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Mouse interaction
        if (isMouseMoving) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) { // Increased interaction radius
            particle.dx -= dx * 0.003;
            particle.dy -= dy * 0.003;
          }
        }

        // Bounce off walls with momentum preservation
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.dx *= -0.95;
          particle.x = particle.x < 0 ? 0 : canvas.width;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.dy *= -0.95;
          particle.y = particle.y < 0 ? 0 : canvas.height;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [inView]);

  return (
    <div ref={ref} className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-background/80" // Added opacity to background
      />
    </div>
  );
}