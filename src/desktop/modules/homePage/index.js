import React from "react";

import Repository from "./businessLogic/repository/Repository";
import Presenter from "./businessLogic/Presenter";
import Home from "./businessLogic/Home";
import View from "./view/Home";

import "./styles/main.module.scss";

let home = new Home({
        dependencies: {
            Repository: new Repository({
                // dependencies: {
                //     HttpClient
                // },
                // urls: {
                //     getInitialData: {
                //         domain: Env.getInstance().getSomeHost(),
                //         path: "/api/",
                //         query: {
                //             page: 1,
                //             perPage: 100
                //         }
                //     }
                // }
            })
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: home
            // Observer,
            // Router: Router.getInstance(),
        }
    });

export default {
    getView(initialData, pageInfo) {
        // Env.getInstance().setLanguage(pageInfo.language);

        return <View options={{initialData, presenter}} />;
    },
    getInitialProps(...args) {
        return this.getServerSideProps(...args);
    },
    getStaticProps(...args) {
        return this.getInitialProps(...args);
    },
    getServerSideProps(context, props) {
        // Env.getInstance().setLanguage(props.pageInfo.language);

        return home.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
