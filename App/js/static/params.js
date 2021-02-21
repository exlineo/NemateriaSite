const PARAMS = {
    SERV: "http://vps550598.ovh.net/nemateriarest/",
    HEAD: {
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    },
    setPOST: (b) => {
        return {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: b
        }
    }
};
export default PARAMS;