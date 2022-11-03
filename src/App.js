import React from 'react';

import './App.css';
import { Box, Container, CssBaseline } from '@material-ui/core';

import { VirtualList } from './component';

function rgb(r, g, b) {
  const color = (r << 16) + (g << 8) + b;
  const hex = `00000000000${color.toString(16)}`.slice(-6);
  return `#${hex}`;
}

const defaultLongItems = Array.from({ length: 15000 }, (_, index) => ({
  id: index,
  height: (Math.random() * 98 + 32) | 0,
  color: rgb(
    Math.random() * 112 + 143,
    Math.random() * 112 + 143,
    Math.random() * 112 + 143
  ),
}));

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container>
        <Box display="flex" height="100vh" flexDirection="column" w={1}>
          <Box>Big List</Box>
          <VirtualList
            flexGrow={1}
            scrollToItem={45}
            items={defaultLongItems}
            renderItem={(item) => {
              return (
                <Box
                  onClick={() => console.log(item)}
                  height={item.height}
                  bgcolor={item.color}
                >
                  {item.id}
                </Box>
              );
            }}
          />
        </Box>
      </Container>
    </div>
  );
}

export default App;
