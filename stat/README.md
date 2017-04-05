## IPC Interface:

    'stat save' , stat
    =>
    'stat save', {error, stat}

    'stat load'
    =>
    'stat load', {error, stats}

    'stat delete', stat
    =>
    'stat delete' {error, stat}

    'stat history', stat
    =>
    'stat history' {error, stats}
