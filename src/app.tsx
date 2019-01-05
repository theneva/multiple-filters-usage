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
    const groupedTransactions = filterTransactions(transactions, {
      category: this.state.category,
      receipt: this.state.receipt,
      year: this.state.year,
    });

    // It doesn't matter which one we choose, as everything is filtered
    // by everything else before having been grouped.
    const filteredTransactions =
      groupedTransactions.categories[this.state.category];

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
              {Object.entries(groupedTransactions.categories).map(
                ([category, transactions]) => (
                  <option key={`category-${category}`} value={category}>
                    {category} ({transactions.length})
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
        <div style={{ marginTop: 8 }}>
          <p style={{ margin: 0, padding: 0 }}>Receipt</p>
          {Object.entries(groupedTransactions.receipts).map(
            ([receipt, transactions]) => (
              <div key={`receipt-${receipt}`}>
                <label>
                  <input
                    type="radio"
                    name="receipt"
                    value={receipt}
                    checked={this.state.receipt === receipt}
                    disabled={transactions.length === 0}
                    onChange={() =>
                      this.setState({ receipt: receipt as ReceiptFilter })
                    }
                  />
                  {receipt}
                </label>
              </div>
            ),
          )}
        </div>
        <div style={{ marginTop: 8 }}>
          <label>
            Year{' '}
            <select
              onChange={e =>
                this.setState({ year: e.target.value as YearFilter })
              }
            >
              {Object.keys(groupedTransactions.years)
                .sort((left, right) => {
                  if (left === 'all') {
                    return -1;
                  }

                  if (right === 'all') {
                    return 1;
                  }

                  return left.localeCompare(right);
                })
                .map(year => (
                  <option key={`year-${year}`} value={year}>
                    {year}
                  </option>
                ))}
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
                  <tr
                    key={`transaction-${description}-${category}-${receipt}-${year}`}
                  >
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
