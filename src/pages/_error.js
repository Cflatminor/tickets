import React from "react";
// import PropTypes from "prop-types";
// import MainLayout from "app/desktop/layouts/main/Main";
// import Error from "app/desktop/components/error/Error";
// import ErrorBoundary from "app/desktop/components/errorBoundary/ErrorBoundary";

class ErrorPage extends React.Component {
    render() {
        return (
            // <ErrorBoundary>
            //     <MainLayout breadcrumbs={this.props.breadcrumbs}>
            //         <Error />
            //     </MainLayout>
            // </ErrorBoundary>
            <p>error</p>
        );
    }
}

ErrorPage.getInitialProps = function () {
    return Promise.resolve({});
};

// ErrorPage.propTypes = {
//     breadcrumbs: PropTypes.arrayOf(Object).isRequired
// };

export default ErrorPage;
