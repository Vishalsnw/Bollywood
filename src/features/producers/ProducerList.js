// src/features/producers/ProducerList.js

import React from "react";
import { Card, CardContent, Typography, Grid, Box, Avatar, Chip } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

function getAvatarColor(idx) {
  const colors = ["#e57373", "#64b5f6", "#81c784", "#ffd54f", "#ba68c8", "#ffb74d", "#4db6ac", "#a1887f"];
  return colors[idx % colors.length];
}

export default function ProducerList({ producers }) {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {producers.map((producer, idx) => (
          <Grid item xs={12} sm={6} md={4} key={producer.id}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar sx={{ bgcolor: getAvatarColor(idx), mr: 2 }}>
                    {producer.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h6" noWrap>
                    {producer.name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <MonetizationOnIcon sx={{ color: "#388e3c", mr: 1 }} />
                  <Typography variant="body1">
                    ₹ {producer.wealth.toLocaleString()}
                  </Typography>
                </Box>
                <Chip
                  icon={<EmojiEventsIcon sx={{ color: "#fbc02d" }} />}
                  label={`Oscars: ${producer.oscars}`}
                  size="small"
                  sx={{ mt: 1, bgcolor: "#fffde7" }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// end of code
