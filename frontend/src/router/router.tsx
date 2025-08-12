import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/miniPages/About";
import PrivacyPolicy from "../pages/miniPages/PrivacyPolicy";
import ContactUs from "../pages/miniPages/ContactUs";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about-us",
                element: <About />
            },
            {
                path: "/privacy-policy",
                element: <PrivacyPolicy />
            },
            {
                path: "/contact-us",
                element: <ContactUs />
            },
        ]
    }
])

export default router;