#include <bits/stdc++.h>
using namespace std;
#define endl '\n'
#define ll long long
#define ld long double
#define pb push_back
#define mp make_pair
#define vpii vector<pair<int, int>>
#define pii pair<int, int>
#define pll pair<long long, long long>
#define vi vector<int>
#define all(x) x.begin(), x.end()
#define vl vector<long long>
#define mii map<int, int>
#define pqb priority_queue<int>
#define rsort(a) sort(a.rbegin(), a.rend())
#define intake(a, n)           \
    ll n;                      \
    cin >> n;                  \
    long long a[n];            \
    for (ll i = 0; i < n; i++) \
    cin >> a[i]
#define intake2(a, n, k)       \
    ll n, k;                   \
    cin >> n >> k;             \
    long long a[n];            \
    for (ll i = 0; i < n; i++) \
    cin >> a[i]
#define intakev(a, n)          \
    ll n;                      \
    cin >> n;                  \
    vi<ll> a(n);               \
    for (ll i = 0; i < n; i++) \
    cin >> a[i]
#define intakev2(a, n, k)      \
    ll n, k;                   \
    cin >> n >> k;             \
    vi<ll> a(n);               \
    for (ll i = 0; i < n; i++) \
    cin >> a[i]

#define get_s1(a) accumulate(a.begin(), a.end(), 0LL)
#define get_max(a) *max_element(a.begin(), a.end())
#define get_min(a) *min_element(a.begin(), a.end())
#define get_max_pos(v) max_element(v.begin(), v.end()) - v.begin()
#define setbits(x) __builtin_popcountll(x)
// #define ceil(a,b) (a+b-1)/b
#define dbg1(x) cout << #x << " " << x
#define dbg2(x, y) cout << #x << " " << x << " " << #y << " " << y
#define dbg3(x, y, z) cout << #x << " " << x << " " << #y << " " << y << " " << #z << " " << z
void _print(ll t)
{
    cerr << t;
}
void _print(int t) { cerr << t; }
void _print(string t) { cerr << t; }
void _print(char t) { cerr << t; }
void _print(ld t) { cerr << t; }
void _print(double t) { cerr << t; }
template <class T, class V>
void _print(pair<T, V> p);
template <class T>
void _print(vector<T> v);
template <class T>
void _print(set<T> v);
template <class T, class V>
void _print(map<T, V> v);
template <class T>
void _print(multiset<T> v);
template <class T, class V>
void _print(pair<T, V> p)
{
    cerr << "{";
    _print(p.first);
    cerr << ",";
    _print(p.second);
    cerr << "}";
}
template <class T>
void _print(vector<T> v)
{
    cerr << "[ ";
    for (T i : v)
    {
        _print(i);
        cerr << " ";
    }
    cerr << "]";
}
template <class T>
void _print(set<T> v)
{
    cerr << "[ ";
    for (T i : v)
    {
        _print(i);
        cerr << " ";
    }
    cerr << "]";
}
template <class T>
void _print(multiset<T> v)
{
    cerr << "[ ";
    for (T i : v)
    {
        _print(i);
        cerr << " ";
    }
    cerr << "]";
}
template <class T, class V>
void _print(map<T, V> v)
{
    cerr << "[ ";
    for (auto i : v)
    {
        _print(i);
        cerr << " ";
    }
    cerr << "]";
}
#define mod 2000000007
#define inf 1e18
#define MAX 500007
#define ld long double
#define w(t)  \
    int t;    \
    cin >> t; \
    while (t--)
#define in(k) \
    ll k;     \
    cin >> k
#define in2(n, k) \
    ll n, k;      \
    cin >> n >> k
#define f(i, x) for (int i = 0; i < x; i++)
#define rep(i, a, b) for (int i = a; i < b; i++)
#define int long long int
int _mergeSort(int a[], int temp[], int left, int right);
int merge(int a[], int temp[], int left, int mid,
          int right);

/* This function sorts the
   input aay and returns the
number of inversions in the aay */
int mergeSort(int a[], int aay_size)
{
    int temp[aay_size];
    return _mergeSort(a, temp, 0, aay_size - 1);
}

/* An auxiliary recursive function
  that sorts the input aay and
returns the number of inversions in the aay. */
int _mergeSort(int a[], int temp[], int left, int right)
{
    int mid, inv_count = 0;
    if (right > left)
    {
        /* Divide the aay into two parts and
        call _mergeSortAndCountInv()
        for each of the parts */
        mid = (right + left) / 2;

        /* Inversion count will be s1 of
        inversions in left-part, right-part
        and number of inversions in merging */
        inv_count += _mergeSort(a, temp, left, mid);
        inv_count += _mergeSort(a, temp, mid + 1, right);

        /*Merge the two parts*/
        inv_count += merge(a, temp, left, mid + 1, right);
    }
    return inv_count;
}

/* This function merges two sorted aays
and returns inversion count in the aays.*/
int merge(int a[], int temp[], int left, int mid,
          int right)
{
    int i, j, k;
    int inv_count = 0;

    i = left; /* i is index for left subaay*/
    j = mid;  /* j is index for right subaay*/
    k = left; /* k is index for resultant merged subaay*/
    while ((i <= mid - 1) && (j <= right))
    {
        if (a[i] <= a[j])
        {
            temp[k++] = a[i++];
        }
        else
        {
            temp[k++] = a[j++];

            /* this is tricky -- see above
            explanation/diagram for merge()*/
            inv_count = inv_count + (mid - i);
        }
    }

    /* Copy the remaining elements of left subaay
(if there are any) to temp*/
    while (i <= mid - 1)
        temp[k++] = a[i++];

    /* Copy the remaining elements of right subaay
       (if there are any) to temp*/
    while (j <= right)
        temp[k++] = a[j++];

    /*Copy back the merged elements to original aay*/
    for (i = left; i <= right; i++)
        a[i] = temp[i];

    return inv_count;
}
int counta[100001];
int count_of_multiples[100001];

long long countPairs(vector<int> &vec, int k)
{
    int n = vec.size();
    for (int i = 0; i < n; i++)

        // counting frequency of  each
        // element in vector
        counta[vec[i]]++;

    for (int i = 1; i < 100001; i++)
    {
        for (int j = i; j < 100001; j = j + i)

            // counting total elements present in
            // aay which are multiple of i
            count_of_multiples[i] += counta[j];
    }

    long long lcm = 0;
    for (int i = 0; i < n; i++)
    {
        long long factor = __gcd(k, vec[i]);
        long long remaining_factor = (k / factor);
        long long j = count_of_multiples[remaining_factor];

        // if vec[i] itself is multiple of
        // remaining factor then we to ignore
        // it as  i!=j
        if (vec[i] % remaining_factor == 1)
            j--;
        lcm += j;
    }

    // as we have counted any distinct pair
    // (i, j) two times, we need to take them
    // only once
    lcm /= 2;

    return lcm;
}
bool compare(vector<int> v, vector<int> v2)
{
    if (v[0] == v2[0])
    {
        return v[1] > v2[1];
    }
    return v2[0] < v[0];
}
bool compare2(vector<int> v, vector<int> v2)
{
    return v2[1] < v[1];
}
int prec(char a)
{
    if (a == '+' || a == '-')
    {
        return 1;
    }
    else if (a == '*' || a == '/')
    {
        return 2;
    }
    else if (a == '^')
    {
        return 3;
    }
    return 0;
}
string postfix(string s1)
{
    string p = "";
    stack<char> s;
    f(i, s1.length())
    {
        if (s1[i] >= 'a' && s1[i] <= 'z')
        {
            p.pb(s1[i]);
        }
        else if (s1[i] == '(')
        {
            s.push(s1[i]);
        }
        else if (s1[i] == ')')
        {
            while (s.top() != '(')
            {
                p.pb(s.top());
                s.pop();
            }
            s.pop();
        }
        else
        {
            while (!s.empty() && prec(s1[i]) <= prec(s.top()))
            {
                p.pb(s.top());
                s.pop();
            }
            s.push(s1[i]);
        }
    }
    while (!s.empty())
    {
        p.pb(s.top());
        s.pop();
    }
    cout << p << endl;
}
/* lcs for (int i = 1; i <= n; i++)
{
    for (int j = 1; j <= 3; j++)
    {
        if (s[i - 1] == s1[j - 1])
        {
            dp[i][j] = dp[i - 1][j - 1] + 1;
        }
        else
        {
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
*/

int32_t main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    w(t1)
    {
        intake(a, n);
        int b[21] = {0};
        int c[21] = {0};
        int d[21] = {0};
        int e[21] = {0};
        int f[21] = {0};
        int g[21] = {0};
        f(i, n)
        {
            int k = a[i];
            int ct = 0;
            int z = 0;
            while (ct < 21)
            {
                if (k % 2 == 0)
                {
                    if (e[ct] % 2 != 0)
                    {
                        c[ct]++;
                    }
                }
                else
                {
                    e[ct]++;
                    if (e[ct] % 2 != 0)
                    {
                        c[ct]++;
                    }
                }
                k /= 2;
                ct++;
            }
        }
        f(i, 21)
        {
            e[i] = 0;
        }

        int ans = 0;
        for (int i = 0; i < n; i++)
        {
            int k = a[i];
            int ct = 0;

            int num = n - i;
            while (ct < 21)
            {
                if (k % 2 == 1)
                {
                    c[ct] = num - c[ct];
                    e[ct]++;
                }
                else
                {
                    if (e[ct] % 2 != 0)
                        c[ct]--;
                }
                ct++;
                k /= 2;
            }
            int k1 = log2(a[i]);
            ans += b[k1] + c[k1];
            cout << ans << ' ' << b[k1] << " ";
            ans += c[k1] * (i - b[k1]);
            cout << ans << ' ';
            ans += (n - 1 - i - c[k1]) * b[k1];
            k = a[i];
            cout << ans << ' ';
            cout << endl;
            ct = 0;
            int z1 = 0, z2 = 0;
            while (ct < 21)
            {
                if (k % 2 == 0)
                {
                    if (d[ct] % 2 != 0)
                    {
                        f[ct]++;
                    }
                    else
                    {
                        g[ct]++;
                    }
                }
                else
                {
                    d[ct]++;
                    if (d[ct] % 2 == 0)
                    {
                        b[ct] = f[ct] + (d[ct] / 2);
                    }
                    else
                    {
                        b[ct] = g[ct] + (d[ct] / 2) + 1;
                    }
                }
                k /= 2;
                ct++;
            }
        }
        cout << ans << endl;
    }
    return 0;
}