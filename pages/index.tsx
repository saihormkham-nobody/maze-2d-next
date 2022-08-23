import type { NextPage } from "next";
import Image from "next/image";
import stoneImage from "../images/stone.png";
import avaterImage from "../images/avater.png";
import { bfs, getPath } from "../ulti/bfs";
import { Cell } from "../type";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import mazes from "../mazes/mazes";

//Get predefined Maze
const maze = mazes[2];
//Set Start Point
const start: Cell = { row: 0, col: 0 };
//Set End Point
const end: Cell = { row: maze.length - 1, col: maze[0].length - 1 };
//Get Value map
const value = bfs(maze, start, end);
//Get Path
const path = getPath(value, end);

const Home: NextPage = () => {
  const [currentPathIndex, currentPathIndexSet] = useState(0);
  const [showValueMap, showValueMapSet] = useState(false);
  const [isAnimated, isAnimatedSet] = useState(false);

  useEffect(() => {
    // Animate Mario
    if (isAnimated) {
      const timer = setInterval(() => {
        currentPathIndexSet((prev) => {
          return (prev + 1) % path.length;
        });
      }, 600);
      return () => {
        return clearInterval(timer);
      };
    }
  }, [isAnimated]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 gap-5 ">
      <div className="my-4">
        <p>{`${JSON.stringify(path[currentPathIndex])} `}</p>
        <button
          className="p-4"
          onClick={() => showValueMapSet((prev) => !prev)}
        >
          show value map
        </button>
        <button className="p-4" onClick={() => isAnimatedSet((prev) => !prev)}>
          {isAnimated ? "Stop Animation" : "Start Animation"}
        </button>
      </div>
      <div className="flex flex-row gap-3">
        <div className="relative">
          <RenderMaze maze={maze} />
          <motion.div
            className="absolute top-0 left-0 w-20 h-20 flex justify-center items-center p-4"
            animate={{
              top: path[currentPathIndex].row * 80,
              left: path[currentPathIndex].col * 80,
            }}
          >
            <Avator />
          </motion.div>
        </div>
        {showValueMap && <ValueMap value={value} />}
      </div>
    </div>
  );
};

const RenderMaze = (props: { maze: number[][] }) => (
  <div className="border-2 border-black">
    {props.maze.map((row, rowIndex) => (
      <div className="flex flex-row ">
        {row.map((isBlocked, colIndex) => (
          <div
            key={`maze-${rowIndex}${colIndex}`}
            className="flex items-center justify-center  w-20 h-20 broder border-white"
          >
            {isBlocked ? (
              <Image src={stoneImage} width={100} height={100} />
            ) : (
              <p></p>
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const Avator = () => <Image src={avaterImage} width={80} height={80} />;

const ValueMap = (props: { value: number[][] }) => {
  return (
    <div className="">
      {props.value.map((row) => (
        <div className="flex flex-row ">
          {row.map((value) => (
            <div
              key={`value${row}${value}`}
              className={`flex items-center text-xl justify-center w-20 h-20 border border-black ${
                value <= 0 ? "bg-red-500" : "bg-green-300"
              }`}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
