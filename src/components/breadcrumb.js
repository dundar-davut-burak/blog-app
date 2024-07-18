'use client'
import React from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NextBreadcrumb = ({
    separator, containerClasses, listClasses, activeClasses, capitalizeLinks
}) => {
    // Get Pathname
    const paths = usePathname();
    const pathNames = paths.split('/').filter(path => path);

    return (
        <div>
            {/* Breadcrumb */}
            <ul className={containerClasses}>
                {
                    pathNames.map((link, index) => {
                        // Get Pathname
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`;
                        // Get Item Classes
                        let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses;
                        // Get Item Link
                        let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link;
                        // Return Item
                        return (
                            <React.Fragment key={index}>
                                <li className={itemClasses} >
                                    <Link href={href}>{itemLink}</Link>
                                </li>
                                {/* Separator */}
                                {pathNames.length !== index + 1 && separator}
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default NextBreadcrumb;