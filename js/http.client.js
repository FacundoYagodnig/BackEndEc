async function get(url, id){
    try {
        return await fetch(url+(id||'')).then(r => r.json())
        }
    catch(error){
        console.error('ERROR GET', error)
    }
}

async function post(url, dato){
    try {
        return await fetch(url, {
            method: 'post',
            body: JSON.stringify(dato),
            headers:{'content-type' : 'application/json'}
        }).then(r => r.json())
        }
    catch(error){
        console.error('ERROR POST', error)
    }
}

async function put(url, id, dato){
    try {
        return await fetch(url+id, {
            method: 'put',
            body: JSON.stringify(dato),
            headers:{'content-type' : 'application/json'}
        })
        .then(r => r.json()) 
    }
    catch(error){
        console.error('ERROR PUT', error)
    }
}

async function del(url, id){
    try {
        return await fetch(url+id, {method: 'delete',}).then(r => r.json())
    }
    catch(error){
        console.error('ERROR DELETE', error)
    }
}

