import PropTypes from 'prop-types'
import { Button } from './Button';
import { useLocation } from 'react-router-dom';
export const Header = ({ title, showAddTask, toggleShowAddTask }) => {
    const location = useLocation()
    return (
        <header>
            <h1>
                {title}
            </h1>
            {location.pathname === '/' && <Button color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={() => { (showAddTask && toggleShowAddTask(false)) || (!showAddTask && toggleShowAddTask(true)) }} />
            }
        </header>
    )
}

Header.defaultProps = {
    title: 'selfsculpted'
}

Header.propTypes = {
    title: PropTypes.string
}