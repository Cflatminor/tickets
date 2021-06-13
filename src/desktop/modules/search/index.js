import React from "react";

import Env from "app/core/environment";

import TicketEntity from "app/core/entities/ticket/Ticket";

import HttpClient from "app/core/utilities/httpClient/HttpClient";

import Repository from "./businessLogic/repository/Repository";
import Presenter from "./businessLogic/Presenter";
import Search from "./businessLogic/Search";
import View from "./view/Search";

import "./styles/main.module.scss";

let search = new Search({
        dependencies: {
            Repository: new Repository({
                dependencies: {
                    HttpClient
                },
                urls: {
                    getTicketsByRoute: {
                        domain: "Env.getInstance().getSomeHost()",
                        path: "/api/",
                        query: {
                            page: 1,
                            perPage: 100
                        }
                    }
                }
            }),
            TicketEntity
        }
    }),
    presenter = new Presenter({
        dependencies: {
            Model: search
        }
    });

export default {
    getView(initialData, pageInfo) {
        Env.getInstance().setLanguage(pageInfo.language);

        return <View options={{initialData, presenter}} />;
    },
    getInitialProps(...args) {
        return this.getServerSideProps(...args);
    },
    getServerSideProps(context, props) {
        // Env.getInstance().setLanguage(props.pageInfo.language);

        return search.getInitialProps(context, props);
    },
    normalizeInitialProps(...args) {
        return presenter.normalizeInitialProps(...args);
    }
};
