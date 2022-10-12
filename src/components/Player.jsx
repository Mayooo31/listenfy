import { useState } from "react";
import { useCtx } from "../context/context";
import Slider from "react-input-slider";

import preview from "../assets/preview.jpg";

import {
  PlayIcon,
  PauseIcon,
  SpeakerXMarkIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

const Player = () => {
  const { userLoggedToken } = useCtx();
  const [playback, setPlayback] = useState({ x: 70 });
  const [playbackVolume, setPlaybackVolume] = useState({ x: 50 });

  // console.log(playback);
  // console.log(playbackVolume);

  return (
    <section className="relative flex w-full h-36 rounded-2xl text-grayish bg-blackish shadow-xxx">
      <div className="relative h-36 w-40 hidden ss:flex justify-center items-center">
        <HeartIcon className="absolute z-10 top-[5%] right-[-15px] w-10 h-10 hover:text-[#669fd8] cursor-pointer ease-linear duration-100" />
        <img
          src={preview}
          className="h-[75%] border-[5px] border-solid border-[#669fd8] object-cover rounded-full"
        />
      </div>
      <div className="relative h-full w-full flex flex-col items-center gap-4 justify-end md:w-[calc(90%-160px)]">
        <div className="absolute px-5 flex gap-2 top-0 left-0 pt-[8px] w-full items-center justify-center whitespace-nowrap">
          <p className="text-2xl font-medium">LAUSSE THE CAT</p>
          <span>-</span>
          <p className="text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
            Belle Bouteille
          </p>
        </div>
        <div className="flex gap-5 ss:gap-10">
          <BackwardIcon className="w-8 h-8 hover:text-[#669fd8] cursor-pointer ease-linear duration-100" />

          <div className="hover:text-[#669fd8] cursor-pointer ease-linear duration-100">
            <PlayIcon className="w-8 h-8" />
            {/* <PauseIcon className="w-8 h-8" /> */}
          </div>

          <ForwardIcon className="w-8 h-8 hover:text-[#669fd8] cursor-pointer ease-linear duration-100" />
        </div>
        <div className="relative flex flex-col gap-2 w-[85%] md:w-[70%] mb-2">
          <HeartIcon className="absolute ss:hidden top-[-120%] left-[0%] w-10 h-10 hover:text-[#669fd8] cursor-pointer ease-linear duration-100" />
          <Slider
            styles={{
              track: {
                backgroundColor: "#b6b6b6",
                width: "100%",
              },
              active: {
                backgroundColor: "#669fd8",
              },
              thumb: { backgroundColor: "#e6e6e6", width: 25, height: 25 },
            }}
            axis="x"
            x={playback.x}
            onChange={({ x }) => setPlayback(state => ({ ...state, x }))}
          />
          <div className="flex w-full justify-between">
            <p className="text-base font-medium">0:00</p>
            <p className="text-base font-medium">3:35</p>
          </div>
        </div>
      </div>
      <div className="h-full w-[calc(10%+160px)] hidden md:flex flex-col justify-end items-center">
        <div className="relative flex flex-col gap-2 w-[75%] mb-2">
          <div className="mb-1 hover:text-[#669fd8] cursor-pointer ease-linear duration-100">
            <SpeakerWaveIcon className="w-8 h-8" />
            {/* <SpeakerXMarkIcon className="w-8 h-8" /> */}
          </div>
          <Slider
            styles={{
              track: {
                backgroundColor: "#b6b6b6",
                width: "100%",
              },
              active: {
                backgroundColor: "#669fd8",
              },
              thumb: { backgroundColor: "#e6e6e6", width: 22, height: 22 },
            }}
            axis="x"
            x={playbackVolume.x}
            onChange={({ x }) => setPlaybackVolume(state => ({ ...state, x }))}
          />

          <div className="flex w-full justify-between">
            <p className="text-base font-medium">0%</p>
            <p className="text-base font-medium">100%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Player;
