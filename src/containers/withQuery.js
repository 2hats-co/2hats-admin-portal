import React,{ Component } from 'react'

import { ALGOLIA_INDEX, createAlgoliaIndex } from '../config/algolia'

function withQuery(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                total: 0
            };
        }

        componentDidMount() {
            const index = createAlgoliaIndex(ALGOLIA_INDEX.CANDIDATE_SEARCH);

            index.search({
                "numericFilters": [
                    "history.pre-review.incomplete:1522540800 TO 1530489599"
                ],
                "hitsPerPage": 0,
                "page": 0,
                "restrictSearchableAttributes": "",
                "analytics": false,
                "attributesToRetrieve": "*",             
            }).then(res => {
                console.log(res)
                this.setState({
                    total: res.nbHits
                })
            }).catch(err => {
                console.error("Search stage and status total error: ", err.message);
            });
        }

        render() {
            const { total } = this.state;

            return (
                <div>
                    <WrappedComponent total={total}/>
                </div>
            );
        }
    }
}

export default withQuery;