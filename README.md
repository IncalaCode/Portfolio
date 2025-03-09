# Controler

Controler is a modern, interactive portfolio website built with React and Three.js. It features a dynamic theme toggle, interactive 3D elements, and a responsive design.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/controler.git
    ```
2. Navigate to the project directory:
    ```sh
    cd controler
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

To start the development server, run:
```sh
npm run dev
```

To build the project for production, run:
```sh
npm run build
```

To preview the production build, run:
```sh
npm run preview
```

## Features

- **Theme Toggle**: Switch between light and dark themes.
- **Interactive 3D Elements**: Utilizes Three.js for 3D graphics.
- **Responsive Design**: Optimized for various screen sizes.
- **Dynamic Content**: Easily update projects and other content via the `data.jsx` file.

## Project Structure

```
controler/
├── public/
│   ├── adamsbridge.hdr
│   ├── Inter-Regular.woff
│   ├── NightSkyHDRI003_2K-HDR.exr
│   └── ...
├── src/
│   ├── components/
│   │   ├── BallController.jsx
│   │   ├── Clump.jsx
│   │   ├── ContactMe.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Pointer.jsx
│   │   ├── ProjectsSection.jsx
│   │   └── ThemeToggleButton.jsx
│   ├── animations/
│   │   └── variants.js
│   ├── data.jsx
│   ├── index.css
│   ├── main.jsx
│   └── App.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Three.js**: JavaScript library for 3D graphics.
- **Framer Motion**: Library for animations.
- **Styled Components**: Library for styling React components.
- **Tailwind CSS**: Utility-first CSS framework.
- **Vite**: Next-generation frontend tooling.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
