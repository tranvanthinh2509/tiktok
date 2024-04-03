/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            height: {
                '[-60]': '60px',
                '[-46]': '46px',
                '[-542]': '542px',
                '[-302]': '302px',
                '[-510]': '510px',
                '[-911]': '911px',
                '[-700]': '700px',
            },
            width: {
                '[-500]': '500px',
                '[-1]': '1px',
                '[-110]': '110px',
                '[-510]': '510px',
                '[-303]': '303px',
                '[-736]': '736px',
                '[-226]': '226px',
                '[-382]': '382px',
                '[-1375]': '1375px',
                '[-700]': '700px',
            },
            maxWidth: {
                '[-692]': '692px',
            },
            borderColor: {
                '[-gray]': 'rgb(229 229 229)',
                '[outline]': '#c5c6c9',
                '[-gray-button]': 'rgba(22, 24, 35, 0.12)',
            },
            backgroundColor: {
                '[-input]': 'rgb(241 241 242)',
                '[-primary]': 'rgb(254, 44, 85)',
                '[-button-text]': 'rgba(22, 24, 35, 0.03)',
                '[-button-primary]': 'rgb(254, 44, 85)',
            },
            borderRadius: {
                '[-92]': '92px',
                '[-8]': '8px',
                '[-50%]': '50%',
            },
            fontSize: {
                '[-16]': '16px',
                '[-14]': '14px',
                '[-18]': '18px',
            },
            boxShadow: {
                '[-wrapper]': 'rgba(0, 0, 0, 0.12) 0px 2px 12px',
            },
            textColor: {
                '[text-color]': 'rgb(22, 24, 35)',
            },
            minWidth: {
                '[w-100]': '100px',
            },
        },
    },
    plugins: [],
};
