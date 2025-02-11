import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { CardContent } from "./ui/card";
import { CardHeader } from "./ui/card";
import { CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";
import { Timer, User } from 'lucide-react';

const AuctionPage = ({ teamData, onPlayerPurchase }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState({
    name: "MS Dhoni",
    role: "Wicket Keeper",
    basePrice: 1000,
    stats: {
      matches: 350,
      average: 38.09,
      strikeRate: 92.5
    }
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleBid = () => {
    if (Number(bidAmount) > currentBid) {
      setCurrentBid(Number(bidAmount));
      setBidAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Player Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Current Player</span>
                <div className="flex items-center space-x-2 text-orange-500">
                  <Timer className="h-5 w-5" />
                  <span>{timeLeft}s</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="h-24 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{currentPlayer.name}</h3>
                  <p className="text-gray-600">{currentPlayer.role}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Matches</p>
                      <p className="font-semibold">{currentPlayer.stats.matches}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Average</p>
                      <p className="font-semibold">{currentPlayer.stats.average}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Strike Rate</p>
                      <p className="font-semibold">{currentPlayer.stats.strikeRate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bidding Card */}
          <Card>
            <CardHeader>
              <CardTitle>Current Bid</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-center text-green-600">
                ₹{currentBid}
              </div>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Enter bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
                <Button 
                  className="w-full"
                  onClick={handleBid}
                  disabled={timeLeft === 0}
                >
                  Place Bid
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Status */}
        <Card>
          <CardHeader>
            <CardTitle>Your Team Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold">Batsmen ({teamData?.purchasedPlayers?.filter(p => p.role === "BAT").length}/3)</h4>
                <p className="text-sm text-gray-500">
                  {3 - (teamData?.purchasedPlayers?.filter(p => p.role === "BAT").length || 0)} slots remaining
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Bowlers ({teamData?.purchasedPlayers?.filter(p => p.role === "BOWL").length}/3)</h4>
                <p className="text-sm text-gray-500">
                  {3 - (teamData?.purchasedPlayers?.filter(p => p.role === "BOWL").length || 0)} slots remaining
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Wicket Keeper ({teamData?.purchasedPlayers?.filter(p => p.role === "WK").length}/1)</h4>
                <p className="text-sm text-gray-500">
                  {1 - (teamData?.purchasedPlayers?.filter(p => p.role === "WK").length || 0)} slot remaining
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuctionPage;