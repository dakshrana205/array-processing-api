const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// User details (as per requirements)
const USER_DETAILS = {
  fullName: 'daksh_rana',
  email: 'ranadaksh205@gmail.com',
  rollNumber: '2210991475',
};

// Helper functions
const isNumber = (str) => !isNaN(str) && !isNaN(parseFloat(str));
const isAlphabet = (char) => /^[a-zA-Z]$/.test(char);
const isSpecialChar = (char) => /[^a-zA-Z0-9]/.test(char);

// Process data array
const processData = (data) => {
  const result = {
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: 0
  };

  data.forEach(item => {
    // Handle string items
    if (typeof item === 'string') {
      // Check if it's a single character
      if (item.length === 1) {
        if (isAlphabet(item)) {
          result.alphabets.push(item.toUpperCase());
        } else if (isSpecialChar(item)) {
          result.special_characters.push(item);
        } else if (isNumber(item)) {
          const num = parseInt(item, 10);
          if (num % 2 === 0) {
            result.even_numbers.push(item);
          } else {
            result.odd_numbers.push(item);
          }
          result.sum += num;
        }
      } else {
        // Handle multi-character strings (treat as alphabets if all letters)
        if (/^[a-zA-Z]+$/.test(item)) {
          result.alphabets.push(item.toUpperCase());
        } else {
          // If not all letters, treat as special characters
          result.special_characters.push(item);
        }
      }
    }
    // Handle number items (shouldn't happen if input is properly formatted as strings)
    else if (typeof item === 'number') {
      const num = item;
      if (num % 2 === 0) {
        result.even_numbers.push(num.toString());
      } else {
        result.odd_numbers.push(num.toString());
      }
      result.sum += num;
    }
  });

  // Generate concatenated string in reverse order with alternating caps
  let concatStr = '';
  const allAlphabets = result.alphabets.join('').split('');
  allAlphabets.reverse().forEach((char, index) => {
    concatStr += index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
  });

  return {
    ...result,
    sum: result.sum.toString(),
    concat_string: concatStr
  };
};

// API endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid input. Expected an array in the "data" field.'
      });
    }

    const processedData = processData(data);
    const currentDate = new Date();
    const formattedDate = [
      String(currentDate.getDate()).padStart(2, '0'),
      String(currentDate.getMonth() + 1).padStart(2, '0'),
      currentDate.getFullYear()
    ].join('');

    const response = {
      is_success: true,
      user_id: `${USER_DETAILS.fullName.toLowerCase()}_${formattedDate}`,
      email: USER_DETAILS.email,
      roll_number: USER_DETAILS.rollNumber,
      ...processedData
    };

    res.json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      error: 'An error occurred while processing the request.'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
