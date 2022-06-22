/* eslint-disable testing-library/no-node-access */
import React  from "react";
import { render, screen } from "@testing-library/react";
import LeaderboardModal from "./LeaderboardModal"
import userEvent from "@testing-library/user-event";

const handleCloseLeaderboard = jest.fn();

describe("component LeaderboardModal", () => {

   function renderWithUser(component) {
    return {
      user: userEvent.setup(),
      ...render(<>{component}</>),
    };
  }

  it("show empty board", () => {
    render(<LeaderboardModal leaderboard={[]}/>);

    expect(document.querySelectorAll("li")).toHaveLength(0);
  });

  it("show undefined board", () => {
    render(<LeaderboardModal leaderboard={undefined}/>);

    expect(document.querySelectorAll("li")).toHaveLength(0);
  });

  it("show sorted board", () => {
    render(<LeaderboardModal leaderboard={[
      {area:"area A", percentageCollected:20},
      {area:"area B", percentageCollected:100},
      {area:"area C", percentageCollected:0},
    ]}/>);

    expect([...document.querySelectorAll("li")].map(item => item.textContent)).toStrictEqual([
      "area B100%","area A20%","area C0%",
    ]);
  });

  it("fire close on clicking close button", async () => {
    const {user} = renderWithUser(<LeaderboardModal
      handleCloseLeaderboard={handleCloseLeaderboard}
      leaderboard={[
        {area:"area A", percentageCollected:20},
        {area:"area B", percentageCollected:100},
        {area:"area C", percentageCollected:0},
      ]}
    />);

    await user.click(screen.getByLabelText("Close"));

    expect(handleCloseLeaderboard).toHaveBeenCalledTimes(1);
  });
      
});
