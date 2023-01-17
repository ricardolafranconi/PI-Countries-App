import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';

describe("LandingPage", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
    });

   
    it("renders a p tag with class 'title' and the correct text", () => {
        expect(screen.getByText("Welcome to Countries of the World!")).toBeInTheDocument();
    });

    it("renders a Link component with the correct 'to' prop", () => {
        expect(screen.getByRole("link").getAttribute("href")).toBe("/countries");
    });

    it("renders a button with class 'btnlandPage' and the correct text", () => {
        expect(screen.getByText("Hop on Board!")).toBeInTheDocument();
    });
});
