function test(call, args, count, n) {
    let r = (JSON.stringify(call.apply(n, args)) === JSON.stringify(count));
    console.assert(r, `Found items count: ${count}`);
    if (!r) throw `${args}\nTest failed!`;
}

function dscount(str,s1,s2) {
    var lowercase_str = str.toLowerCase();
    var ans = 0;
    for (let i = 0; i < lowercase_str.length - 1; ++i) {
        if (lowercase_str[i] == s1 && lowercase_str[i + 1] == s2) {
            ++ans;
        }
    }
    return ans;
}

function checkSyntax(str) {
    let opn_brackets = ['<','[','{','('];
    let cls_brackets = ['>',']','}',')'];
    let LIFO = [];
    for (let i = 0;i<str.length;++i) {
        if (opn_brackets.includes(str[i])) {
            LIFO.push(opn_brackets.indexOf(str[i]));
        }
        else if (cls_brackets.includes(str[i])) {
            if (LIFO.length == 0) {
                return 1;
            }
            else if (LIFO.pop() != cls_brackets.indexOf(str[i])) {
                return 1;
            }
        }
    }
    if (LIFO.length == 0) {
        return 0;
    }
    else {
        return 1;
    }
}

function bin_search(arr, x) {

    let start=0, end=arr.length-1;

    while (start<=end){
        let mid=Math.floor((start + end)/2);
        if (arr[mid]===x) return mid;
        else if (arr[mid] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }
    return -1;
}

function algorithm(array,n) {
    for (let i = 0;i<array.length;++i) {
        let j = bin_search(array,n - array[i]);
        if (j!=-1) {
            return {i,j};
        }
    }
    return {};
}

function parseUrl(url) {
    var ans = {}
    ans['href'] = url;
    ans['protocol'] = url.substring(0,url.indexOf(':') + 1);
    url = url.slice(url.indexOf(':') + 3);
    if (url.indexOf('@')!=-1) {
        ans['username'] = url.substring(0,url.indexOf(':'));
        url = url.slice(url.indexOf(':') + 1);
        ans['password'] = url.substring(0,url.indexOf('@'));
        url = url.slice(url.indexOf('@') + 1);
    }
    ans['host'] = url.substring(0,url.indexOf('/'));
    if (url.indexOf(':')!=-1) {
        ans['hostname'] = url.substring(0,url.indexOf(':'));
        url = url.slice(url.indexOf(':') + 1);
        ans['port'] = url.substring(0,url.indexOf('/'));
        url = url.slice(url.indexOf('/'));
    }
    else {
        ans['hostname'] = url.substring(0,url.indexOf('/'));
        url = url.slice(url.indexOf('/'))
    }
    if (url.length == 0) {
        ans['pathname'] = '//';
    }
    else {
        if (url.indexOf('?')!=-1) {
            ans['pathname'] = url.substring(0,url.indexOf('?'));
            url = url.slice(url.indexOf('?') + 1);
            if (url.indexOf('#')!=-1) {
                ans['query'] = url.substring(0,url.indexOf('#'));
                url = url.slice(url.indexOf('#'));
                ans['hash'] = url;
            }
            else {
                ans['query'] = url;
            }
        }
        else {
            if (url.indexOf('#')!=-1) {
                ans['pathname'] = url.substring(0,url.indexOf('#'));
                url = url.slice(url.indexOf('#'));
                ans['hash'] = url;
            }
            else {
                ans['pathname'] = url;
            }
        }
    }
    return ans;
}

try {
    test(dscount, ['ab___ab__', 'a', 'b'], 2);
    test(dscount, ['___cd____', 'c', 'd'], 1);
    test(dscount, ['de_______', 'd', 'e'], 1);
    test(dscount, ['12_12__12', '1', '2'], 3);
    test(dscount, ['_ba______', 'a', 'b'], 0);
    test(dscount, ['_a__b____', 'a', 'b'], 0);
    test(dscount, ['-ab-аb-ab', 'a', 'b'], 2);
    test(dscount, ['aAa', 'a', 'a'], 2);
    test(dscount, ['-ab-ab-ab', 'a', 'b'], 3);

    test(checkSyntax,['"---(++++)----"'],0);
    test(checkSyntax,['before ( middle []) after '],0);
    test(checkSyntax,[') ('],1);
    test(checkSyntax,['} {'],1);
    test(checkSyntax,['<(   >)'],1);
    test(checkSyntax,['<(   >)'],1);
    test(checkSyntax,['(  [  <>  ()  ]  <>  )'],0);
    test(checkSyntax,['   (      [)'],1);
    test(checkSyntax,['((((123))))<>{}'],0)
    test(checkSyntax,['())('],1)

    test(algorithm,[[1,2,3,4,5,6,7,8,9,10],10],{i:0,j:8})
    test(algorithm,[[1,2,3,4,5,6,7,8,9,10],44],{})
    test(algorithm,[[1,2,3,4,5,6,7,8,9,10],3],{i:0,j:1})
    test(algorithm,[[1,2,3,4,5,6,7,8,9,10],17],{i:6,j:9})


    test(parseUrl,['Htt-.p1+23://andrey:some_password123@sys.it-co.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo'],{
            href: 'Htt-.p1+23://andrey:some_password123@sys.it-co.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo',
            protocol: 'Htt-.p1+23:',
            username: 'andrey',
            password: 'some_password123',
            host: 'sys.it-co.ru:8080',
            hostname: 'sys.it-co.ru',
            port: '8080',
            pathname: '/do/any.php',
            query: 'a=1&b[]=a&b[]=b',
            hash: '#foo'
        }
    )
    test(parseUrl,['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],{
            href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            protocol: 'https:',
            host: 'www.youtube.com',
            hostname: 'www.youtube.com',
            pathname: '/watch',
            query: 'v=dQw4w9WgXcQ'
        }
    )


    console.info("Congratulations! All tests passed.");
} catch(e) {
    console.error(e);
}
