"use client";

import React, { useState, useEffect, useRef } from "react";

const CircularSpinningButtons = ({
  children,
  speed = 0.01, // Speed of rotation
}: {
  children: React.ReactNode;
  speed?: number;
}) => {
  const [angle, setAngle] = useState(0); // Angle to rotate the buttons
  const [isPaused, setIsPaused] = useState(false); // Pause state for animation
  const radius = 80; // Radius of the circle
  const buttons = React.Children.toArray(children); // Convert children to array
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container

  useEffect(() => {
    let frameId: number;

    // Function to update the rotation angle
    const animate = () => {
      if (!isPaused) {
        setAngle((prev) => prev + speed); // Update angle based on speed
      }
      frameId = requestAnimationFrame(animate); // Continue the animation
    };

    frameId = requestAnimationFrame(animate); // Start the animation

    return () => cancelAnimationFrame(frameId); // Clean up animation on unmount
  }, [isPaused, speed]);

  const handleMouseEnter = () => setIsPaused(true); // Pause animation on hover
  const handleMouseLeave = () => setIsPaused(false); // Resume animation on leave

  return (
    <div
      ref={containerRef}
      className="relative w-[400px] h-[400px] rounded-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotate(${angle}deg)`, // Apply rotation to the whole container
      }}
    >
      {buttons.map((child, index) => {
        const buttonAngle = (index / buttons.length) * 360; // Distribute buttons evenly
        const x = radius * Math.cos((buttonAngle * Math.PI) / 180); // X coordinate
        const y = radius * Math.sin((buttonAngle * Math.PI) / 180); // Y coordinate

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: `rotate(${-angle}deg) translate(-50%, -50%)`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default CircularSpinningButtons;
