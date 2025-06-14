import React from "react";
import { Box, Typography } from "@mui/material";

export default function NewsTicker({ news = [] }) {
  if (!news.length) return null;
  return (
    <Box sx={{ bgcolor: "#fffbe6", p: 1, mb: 2, borderRadius: 1, border: "1px solid #fff9c4" }}>
      <Typography variant="body2" sx={{ whiteSpace: "nowrap", overflowX: "auto" }}>
        <b>News:</b> {news[0].text || news[0]}
      </Typography>
    </Box>
  );
}
