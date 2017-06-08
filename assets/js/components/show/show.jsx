import React from 'react';
import Visualization from '../../d3/visualization';
import { NODELIST } from '../../node/node';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    let visual = new Visualization(NODELIST);
    visual.draw();
    window.v = visual;
    this.setState({ graph: visual });
  }

  render() {
    return (
      <div className="index-main">
        <main className="show-main">
          <section className="show-main">
            <h1 className="show-name">A* Algorithm</h1>
            <ul className="show-visualization">
              <div className="show-visualization" />
              <aside className="show-code">
                <h3>Code area</h3>
              </aside>
            </ul>
          </section>
        </main>
        <section className="show-algo-bottom">
          <h1>Description</h1>
          <ul className="show-algo-description">
            <div className="show-how-it-works">
              <h3>How it Works</h3>
              <p>asdfaf</p>
              <h3>Math</h3>
              <p>asdfasdf</p>
            </div>
            <aside className="show-pros-n-cons">
              <h3>Pros & Cons</h3>
              <p>asdf</p>
            </aside>
          </ul>
        </section>
      </div>
    )
  }
}

export default Show;
