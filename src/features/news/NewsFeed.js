// src/features/news/NewsFeed.js

import React from "react";
import { Card, CardContent, Typography, Box, List, ListItem } from "@mui/material";

export default function NewsFeed({ news }) {
  if (!news || news.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">No news yet! Play a year to see updates.</Typography>
      </Box>
    );
  }

  // Flatten and reverse news so latest is on top
  const newsItems = news.flat().slice().reverse();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Bollywood Headlines
      </Typography>
      <List>
        {newsItems.map((item, idx) => (
          <ListItem key={idx} disablePadding sx={{ mb: 1 }}>
            <Card sx={{ width: "100%", bgcolor: "#f5f5f5", borderRadius: 2 }}>
              <CardContent>
                <Typography variant="body1">{item.text}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Year: {item.year}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

// end of code
