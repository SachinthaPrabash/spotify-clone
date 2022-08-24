export function millieToMinuteAndSecond(millie) {
    const minutes = Math.floor(millie / 60000);
    const second = ((millie % 60000) / 1000).toFixed(0);

    return second == 60 ? minutes
        + 1 + ":00" : minutes + ":" + (second < 10 ? "0" : "") + second;
}