import { atom } from "recoil";

export const CurrentTrackIdState = atom({
    key: "CurrentTrackIdState",
    default: null,
});

export const IsPlayingState = atom({
    key: "IsPlayingState",
    default: false,
});