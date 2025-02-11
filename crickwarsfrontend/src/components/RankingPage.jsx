import React from 'react';
import { Card } from "./ui/card";
import { CardHeader } from "./ui/card";
import { CardTitle } from "./ui/card";
import { CardContent } from "./ui/card";
import { Trophy, Users } from 'lucide-react';

const RankingsPage = ({ teamData }) => {
  // Simulating other teams for demonstration
  const teams = [
    {
      name: teamData.name,
      players: teamData.purchasedPlayers,
      totalSpent: teamData.purchasedPlayers.reduce((acc, player) => acc + player.purchaseAmount, 0),
      rank: 1
    },
    {
      name: "Royal Challengers",
      players: [
        { name: "Jos Buttler", role: "WK", purchaseAmount: 1400 },
        { name: "Steve Smith", role: "BAT", purchaseAmount: 1600 },
        { name: "Pat Cummins", role: "BOWL", purchaseAmount: 1700 }
      ],
      totalSpent: 4700,
      rank: 2
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Trophy className="h-6 w-6" />
              <span>Final Rankings</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {teams.map((team, index) => (
          <Card key={team.name} className={index === 0 ? "border-2 border-yellow-500" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>{team.name}</span>
                </div>
                <span className="text-2xl font-bold text-gray-700">#{team.rank}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {team.players.map(player => (
                    <div key={player.name} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold">{player.name}</p>
                      <p className="text-sm text-gray-500">{player.role}</p>
                      <p className="text-sm text-green-600">₹{player.purchaseAmount}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="text-xl font-bold text-green-600">₹{team.totalSpent}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RankingsPage;