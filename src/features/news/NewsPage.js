import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Divider, Card, CardContent, CardHeader, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const NewsPage = () => {
  const [news, setNews] = useState([
    {
      id: 1,
      title: "Box Office Sensation",
      content: "Vishnu Manchu's latest film breaks all box office records in its opening weekend.",
      date: "2025-06-14",
      category: "Box Office"
    },
    {
      id: 2,
      title: "New Director Announcement",
      content: "Acclaimed producer Amit Bagle announces his directorial debut with an all-star cast.",
      date: "2025-06-12",
      category: "Industry"
    },
    {
      id: 3,
      title: "Award Nominations",
      content: "The prestigious Filmfare Awards nominations have been announced with Golu leading the pack.",
      date: "2025-06-10",
      category: "Awards"
    },
    {
      id: 4,
      title: "Upcoming Releases",
      content: "Five major films set to release next month from top producers including Mangesh and Vasim.",
      date: "2025-06-09",
      category: "Releases"
    },
    {
      id: 5,
      title: "Industry Trends",
      content: "Bollywood sees shift towards OTT platforms as streaming deals surge.",
      date: "2025-06-07",
      category: "Industry"
    }
  ]);

  const categoryColors = {
    "Box Office": "success",
    "Industry": "primary",
    "Awards": "secondary",
    "Releases": "info",
    "Controversy": "error"
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bollywood News
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card elevation={2}>
                <CardHeader 
                  title={item.title}
                  subheader={new Date(item.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  action={
                    <Chip 
                      label={item.category} 
                      color={categoryColors[item.category] || "default"}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  }
                />
                <CardContent>
                  <Typography variant="body1">
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default NewsPage;
