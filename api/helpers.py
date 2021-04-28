from fastapi import Request

def getIP(request: Request):
    client_ip = request.headers.get('cf-connecting-ipp', None)
    if client_ip == None:
        client_ip = request.headers.get('x-forwarded-for')
        if client_ip != None:
            client_ip = client_ip.split(', ')[0]
    if client_ip == None:
        client_ip = request.headers.get('x-real-ip')
    if client_ip == None:
        client_ip = request.client.host
    return client_ip
