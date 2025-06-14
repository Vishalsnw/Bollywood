import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import { useGameContext } from "../../context/GameContext";

const NewsPage = () => {
  const { newsItems, marketTrends, year, month } = useGameContext();
  
  // Sort news by timestamp (most recent first)
  const sortedNews = [...newsItems].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
  
  // Get current month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonthName = monthNames[month - 1];
  
  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bollywood Industry News
        </Typography>
        <Typography variant="body1">
          Stay up-to-date with the latest happenings in the Bollywood film industry.
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Latest Headlines
          </Typography>
          
          {sortedNews.map((news) => {
            const date = new Date(news.timestamp);
            const formattedDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            
            return (
              <Card key={news.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {news.text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Published on {formattedDate}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Industry Trends
          </Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {currentMonthName} {year} Market Report
              </Typography>
              
              <Divider sx={{ my: 1.5 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Genre Popularity
              </Typography>
              
              {marketTrends.sort((a, b) => b.popularity - a.popularity).map((trend) => (
                <Box key={trend.genre} sx={{ mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">
                      {trend.genre}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: trend.growth > 0 ? 'success.main' : 
                             trend.growth < 0 ? 'error.main' : 'text.secondary'
                    }}>
                      {trend.growth > 0 ? '+' : ''}{trend.growth}%
                    </Typography>
                  </Box>
                  <Box sx={{ width: '100%', bgcolor: 'grey.300', height: 8, borderRadius: 5 }}>
                    <Box 
                      sx={{ 
                        width: `${trend.popularity}%`, 
                        bgcolor: trend.popularity > 70 ? 'success.main' : 
                                 trend.popularity > 40 ? 'warning.main' : 'error.main',
                        height: '100%',
                        borderRadius: 5
                      }} 
                    />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quarterly Forecast
              </Typography>
              
              <Divider sx={{ my: 1.5 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Box Office Projections
                </Typography>
                <Typography variant="body2">
                  {marketTrends.find(t => t.popularity === Math.max(...marketTrends.map(mt => mt.popularity)))?.genre} 
                  films are expected to lead the box office this quarter with an average 
                  return of {Math.floor(Math.random() * 80) + 120}% on investment.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Emerging Trends
                </Typography>
                <Typography variant="body2">
                  {marketTrends.find(t => t.growth === Math.max(...marketTrends.map(mt => mt.growth)))?.genre} 
                  is gaining significant audience interest, while
                  {marketTrends.find(t => t.growth === Math.min(...marketTrends.map(mt => mt.growth)))?.genre}
                  is showing declining appeal.
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Industry Challenges
                </Typography>
                <Typography variant="body2">
                  Production costs have increased by {Math.floor(inflation * 1.5)}% this year, 
                  putting pressure on smaller production houses.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewsPage;
