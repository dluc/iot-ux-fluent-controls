import * as React from 'react';
import { ButtonProps, NavProps, Elements as Attr } from '../../Attributes';
import * as classnames from 'classnames/bind';

const cx = classnames.bind(require('./Navigation.module.scss'));

export interface NavigationAttributes {
    container?: NavProps;
    navButton?: ButtonProps;
}

export interface NavigationProperties {
    isExpanded: boolean;
    onClick: React.EventHandler<any>;
    attr?: NavigationAttributes;
    children?: React.ReactNode;
}

export function Navigation({ isExpanded, onClick, attr, children }: NavigationProperties) {
    return (
        <Attr.nav
            className={cx('navigation', { expanded: isExpanded })}
            attr={attr && attr.container}
        >
            <Attr.button
                className='global-nav-item'
                key='globalNavButton'
                onClick={onClick}
                attr={attr && attr.navButton}
            >
                <span className={cx('expand-icon', 'global-nav-item-icon', 'icon', 'icon-chevronRight')} />
            </Attr.button>
            <div className={cx('scrollable')}>
                {children}
            </div>
        </Attr.nav>
    );
}

export function NavigationItemSeparator() {
    return <div className={cx('separator')} />;
}

export default Navigation;
