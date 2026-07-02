import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Leaderboard,
  LeaderboardContent,
  LeaderboardEnd,
  LeaderboardHeader,
  LeaderboardItem,
  LeaderboardStart,
  LeaderboardTitle,
} from "@/components/ui/leaderboard";

const players = [
  { name: "Aria", score: 980 },
  { name: "Kenji", score: 845 },
  { name: "Priya", score: 712 },
  { name: "Marco", score: 508 },
];

const meta = {
  title: "UI/Leaderboard",
  component: Leaderboard,
  tags: ["autodocs"],
  args: {
    className: "max-w-sm",
    children: (
      <>
        <LeaderboardHeader>
          <LeaderboardTitle>Top players</LeaderboardTitle>
        </LeaderboardHeader>
        <LeaderboardContent>
          {players.map((player) => (
            <LeaderboardItem key={player.name} value={player.score} maxValue={1000} aria-label={player.name}>
              <LeaderboardStart>{player.name}</LeaderboardStart>
              <LeaderboardEnd>{player.score}</LeaderboardEnd>
            </LeaderboardItem>
          ))}
        </LeaderboardContent>
      </>
    ),
  },
} satisfies Meta<typeof Leaderboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
