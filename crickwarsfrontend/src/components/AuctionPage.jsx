import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Star } from "lucide-react";
import axios from "axios";

const PlayersRatingPage = () => {
  const [players, setPlayers] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/players"); // Update API endpoint
        console.log(response)
        setPlayers(response.data);
      } catch (err) {
        setError("Failed to load players");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleRatingChange = (id, value) => {
    const rating = Math.min(Math.max(value, 1), 10);
    setRatings((prev) => ({ ...prev, [id]: rating }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Rate Your Favorite Players</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading players...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <Card key={player._id} className="shadow-lg rounded-xl overflow-hidden">
               <img 
  src="https://i.imgur.com/1DhnlAu.jpeg"
 
  alt={player.name} 
  className="h-38 w-full object-cover"
/>

                <CardHeader className="p-4">
                  <CardTitle className="text-xl font-bold">{player.name}</CardTitle>
                  <p className="text-gray-500">{player.role}</p>
                  <p className="text-green-600 font-semibold">₹{player.price}</p>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-500 w-5 h-5" />
                    <span className="font-medium">Rate (1-10):</span>
                  </div>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={ratings[player._id] || ""}
                    onChange={(e) => handleRatingChange(player._id, Number(e.target.value))}
                    className="w-full border-gray-300 rounded-md"
                  />
                  <Button className="w-full bg-primary text-white" disabled={!ratings[player._id]}>
                    Submit Rating
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersRatingPage;
