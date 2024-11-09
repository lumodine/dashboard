export const Footer = () => {
    const startYear = 2024;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const year = startYear === currentYear
        ? startYear
        : `${startYear}-${currentYear}`;

    return (
        <footer className="border-t my-3 pt-3">
            <div className="container">
                <p className="text-center">
                    &copy; {year}
                </p>
            </div>
        </footer>
    );
};
