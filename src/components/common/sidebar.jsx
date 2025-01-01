import { useAuth } from '../../app/authProvider';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { permissions } = useAuth();

    const menuItems = [
        { path: '/', label: 'Dashboard', permission: 'dashboard', icon: 'bi bi-grid' },
        { 
            label: 'Service Provider Manager', 
            permission: 'service_provider', 
            icon: 'bi bi-menu-button-wide', 
            children: [
                { path: '/serviceprovider', label: 'Service Provider', permission: 'serviceprovider' }
            ]
        },
        { 
            label: 'Event Manager', 
            permission: 'event_manager', 
            icon: 'bi bi-menu-button-wide', 
            children: [
                { path: '/event', label: 'Events', permission: 'event' }
            ]
        },
        { 
            label: 'Configuration', 
            permission: 'configaration', 
            icon: 'bi bi-menu-button-wide', 
            children: [
                { path: '/category', label: 'Category Master', permission: 'category' },
                { path: '/country', label: 'Country Master', permission: 'country' },
                { path: '/city', label: 'City Master', permission: 'city' },
                { path: '/location', label: 'Location Master', permission: 'location' },
            ]
        }
    ];

    const hasPermission = (permission) => permissions.includes(permission);
    console.log(permissions);
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                {menuItems.map((item, index) =>
                    item.children ? (
                        hasPermission(item.permission) && (
                            <li key={index} className="nav-item">
                                <a
                                    className="nav-link collapsed"
                                    data-bs-target={`#menu-${index}`}
                                    data-bs-toggle="collapse"
                                    href="#"
                                >
                                    <i className={item.icon} />
                                    <span>{item.label}</span>
                                    <i className="bi bi-chevron-down ms-auto" />
                                </a>
                                <ul id={`menu-${index}`} className="nav-content collapse" data-bs-parent="#sidebar-nav">
                                    {item.children.map((child, childIndex) =>
                                        hasPermission(child.permission) && (
                                            <li key={childIndex}>
                                                <Link to={child.path}>
                                                    <i className="bi bi-circle" />
                                                    <span>{child.label}</span>
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </li>
                        )
                    ) : (
                        hasPermission(item.permission) && (
                            <li key={index} className="nav-item">
                                <Link className="nav-link" to={item.path}>
                                    <i className={item.icon} />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        )
                    )
                )}
            </ul>
        </aside>
    );
};

export default Sidebar;
