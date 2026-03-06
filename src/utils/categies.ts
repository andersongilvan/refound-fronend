import foodIcon from '../assets/icons/food.svg'
import othersIcon from '../assets/icons/others.svg'
import serviceIcon from '../assets/icons/Vector (2).svg'
import transportIcon from '../assets/icons/Name=PoliceCar.svg'
import accommodationIcon from '../assets/icons/Vector.svg'

export const CATEGORIES = {
    food: {
        name: 'food',
        icon: foodIcon
    },
    others: {
        name: 'others',
        icon: othersIcon
    },
    services: {
        name: 'services',
        icon: serviceIcon
    },
    transport: {
        name: 'transport',
        icon: transportIcon
    },
    accommodation: {
        name: 'accommodation',
        icon: accommodationIcon
    },
}

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>
