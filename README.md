## Huffman Coding Simulator

This is a simple web-based project that demonstrates Huffman Coding, a greedy algorithm used for data compression.

The application allows users to compress and decompress text while understanding how the algorithm works.

---

## Features

- Compress text into binary using Huffman Coding  
- View generated Huffman code mapping  
- See compression statistics (original size and compressed size)  
- Generate a Base64 encoded output for transfer  
- Decompress encoded data back to the original message  

---

## Tech Stack

- HTML  
- CSS  
- JavaScript  

---

## How It Works

User enters a message in the compress section.  
The system builds a frequency map, constructs a Huffman tree, and generates binary codes.  
The message is then converted into compressed binary form.

Compression statistics are calculated using:
- Original size (based on 8-bit characters)  
- Compressed size (based on Huffman encoding)

The compressed result is packaged using Base64 for easy copying and transfer.

In the decompress section, the user pastes the Base64 string to retrieve the original message.

---

## Note

Base64 encoding is used only for safe transfer of data.  
Actual compression is measured using the Huffman binary output.

---

## Author

Surya Pratap Singh
