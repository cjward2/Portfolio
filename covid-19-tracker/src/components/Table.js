import numeral from 'numeral';
import './Table.css';

const Table = ({ countries }) => {
    //Build Table data by maping through countries prop. Using numeral module for formatting
    return (
        <div className="table">
            { countries.map(({country, cases}, index) => (
                <tr key={ index }>
                    <td>{ country }</td>
                    <td><strong>{ numeral(cases).format("0,0") }</strong></td>
                </tr>
            )) }
        </div>
    )
}

export default Table
