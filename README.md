# Grocery Tracker App

## CSCI201 Group 6 Project Fall 2023

See shared Google Drive for more documentation.

> Note: We can change the name of this repository once we decide on a project title

# Frontend

### Development
Start by cloning this repository.

To do anything, you will need to install [NodeJS](https://nodejs.org/en) and *npm* (comes with Node). 

Then, navigate to `~/frontend/` in your terminal and
type `npm install` to install all necessary dependencies.

Once everything is installed, you can run `npm run dev` to test the app on your localhost.
After running the command, a link should appear in your terminal. Shift+click on this link,
and the app should appear in your browser.

You will now be able to edit source code and have your changes
appear in real time on your browser!

### Stack
- **React** framework called [Next.js](https://nextjs.org/). This makes React
even easier to use by providing the developer with a whole bunch of
templated elements such as links and images and built-in page routing.
    - Next.js is maintained by Vercel, so hosting our frontend on Vercel will take no
    more than a few clicks. :thumbsup:
- [TailwindCSS](https://tailwindcss.com/). Tailwind is MUCH simpler than vanilla CSS. You
can write CSS directly in your HTML (TSX in this case).
    - To style an element, list the desired stylings in the `className` property in JSX
    - Example: `<div className="font-bold text-green-600 hover:text-red-600">Hello!</div>` creates
    an element with the specified styles.
    - Docs: [Tailwind Docs](https://tailwindcss.com/docs/). The documentation is extremely
    useful and searching for styles is simple.
    - **NOTE**: Tailwind is not necessary. Navigate to `~/frontend/src/app/globals.css` to
    write and apply vanilla CSS.

# Backend
We will do this in Java.
