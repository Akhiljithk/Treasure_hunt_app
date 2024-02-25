import mongoose from "mongoose";

const team = new mongoose.Schema({
  teamId: {
    type: String,
  },
  currentClue: {
    type: Number,
  },
  teamName: {
    type: String,
  },
  passedAnswers: [
    {
      time: Date,
      clueNo: Number,
    },
  ],
  atTreasure: false,
  treasureTime: null,
});

export default mongoose.model("team", team);
