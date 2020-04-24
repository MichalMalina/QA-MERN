import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import NewRecipe from "./NewRecipe";

it('calls callback function when clicking on "Add recipe"', () => {
    // This is a mock callback function
    const onSubmit = jest.fn();

    // Render the NewRecipe component with the mock callback
    const {getByText} = render(<NewRecipe submit={onSubmit}/>);

    // Click on button 'Add recipe'
    fireEvent.click(getByText(/Add recipe/i));

    // Expect the callback to have been called
    expect(onSubmit).toHaveBeenCalled();
});

it('sends new title as the first parameter when clicking "Add recipe"', async () => {
    const onSubmit = jest.fn();
    const {getByLabelText, getByText} = render(<NewRecipe submit={onSubmit}/>);

    // Type the title into the form (simulating user typing)
    const title = "This is the title!";
    await userEvent.type(getByLabelText(/title/i), title);

    // Click on the "Add recipe" button
    fireEvent.click(getByText(/Add recipe/i));

    // The first arg of the first call to the function must be 'title'
    expect(onSubmit.mock.calls[0][0]).toBe(title);
});

it('sends minutes as the third parameter when clicking "Add recipe"', async () => {
    const onSubmit = jest.fn();
    const {getByLabelText, getByText} = render(<NewRecipe submit={onSubmit}/>);

    // Type minutes into the form
    const minutes = "42";
    await userEvent.type(getByLabelText(/minutes/i), minutes);

    // Click on the "Add recipe" button
    fireEvent.click(getByText(/Add recipe/i));

    // The third arg of the first call to the function must be 'minutes'
    expect(onSubmit.mock.calls[0][2]).toBe(minutes);
});