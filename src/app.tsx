import * as React from 'react';
import './app.css';

import {
  Transaction,
  Filters,
  CategoryFilter,
  ReceiptFilter,
  YearFilter,
  filterTransactions,
} from 'filters';

const transactions: Transaction[] = [
  { description: 'Tesco', category: 'food', receipt: 'present', year: '2019' },
  {
    description: 'Underground',
    category: 'transport',
    receipt: 'present',
    year: '2019',
  },
  { description: 'Coop', category: 'food', receipt: 'missing', year: '2018' },
  {
    description: 'Google',
    category: 'internet',
    receipt: 'present',
    year: '2017',
  },
  {
    description: 'Taxi',
    category: 'transport',
    receipt: 'present',
    year: '2017',
  },
];

class App extends React.PureComponent<{}, Filters> {
  state = {
    category: 'all' as CategoryFilter,
    receipt: 'all' as ReceiptFilter,
    year: 'all' as YearFilter,
  };

  render() {
    // TODO
    const filteredTransactions = transactions;

    return (
      <div>
        <div>
          <label>
            Category
            <select
              onChange={e =>
                this.setState({ category: e.target.value as CategoryFilter })
              }
            >
              <option value="all">all</option>
              <option value="transport">transport</option>
              <option value="food">food</option>
              <option value="internet">internet</option>
            </select>
          </label>
        </div>
        <div style={{ marginTop: 8 }}>
          <p style={{ margin: 0, padding: 0 }}>Receipt</p>
          <div>
            <label>
              <input
                type="radio"
                name="receipt"
                value="all"
                checked={this.state.receipt === 'all'}
                onChange={() => this.setState({ receipt: 'all' })}
              />{' '}
              all
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="receipt"
                value="present"
                checked={this.state.receipt === 'present'}
                onChange={() => this.setState({ receipt: 'present' })}
              />{' '}
              present
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="receipt"
                value="missing"
                checked={this.state.receipt === 'missing'}
                onChange={() => this.setState({ receipt: 'missing' })}
              />{' '}
              missing
            </label>
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          <label>
            Year{' '}
            <select
              onChange={e =>
                this.setState({ year: e.target.value as YearFilter })
              }
            >
              <option value="all">all</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
            </select>
          </label>
        </div>
        <hr />
        <div>
          Transactions
          <table>
            <thead>
              <th>description</th>
              <th>category</th>
              <th>receipt</th>
              <th>year</th>
            </thead>
            <tbody>
              {filteredTransactions.map(
                ({ description, category, receipt, year }) => (
                  <tr>
                    <td>{description}</td>
                    <td>{category}</td>
                    <td>{receipt}</td>
                    <td>{year}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
