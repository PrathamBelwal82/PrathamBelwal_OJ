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

class node
{
public:
    int x, y;
    node *A;
    node *B;
    node *C;
    node *D;
    node(int x1, int y1)
    {
        x = x1;
        y = y1;
        A = NULL, B = NULL, C = NULL, D = NULL;
    }
};

int32_t main()
{

    in2(n, m);
    unordered_map<int, node *> mp;
    string s;
    cin >> s;
    for (int i = 0; i < n; i++)
    {
        in2(l, r);
        node *newNode = new node(l, r);
        mp[i] = newNode;
    }
    for (int i = 0; i < n-1; i++)
    {
        node *node1;
        node1 = mp[i];
        int z1 = 1e10;
        int z2 = z1, z3 = z1, z4 = z1;
        for (int j = i + 1; j < n; j++)
        {
            node *node2;
            node2 = mp[j];
            int k1 = node2->y - (node1->y);
            int k2 = node2->x - (node1->x);

            if (abs(k1) == abs(k2))
            {
                if (k1 > 0 && k2 > 0)
                {
                    if (z1 > k1)
                    {
                        z1 = k1;
                        node1->A = node2;
                        node2->D = node1;
                    }
                }
                else if (k1 > 0)
                {
                    if (z2 > k1)
                    {
                        z2 = k1;
                        node1->C = node2;
                        node2->B = node1;
                    }
                }
                else if (k2 > 0)
                {
                    if (z3 > k2)
                    {
                        z3 = k2;
                        node1->B = node2;
                        node2->C = node1;
                    }
                }
                else
                {
                    if (z4 > abs(k2))
                    {
                        z4 = abs(k2);
                        node1->D = node2;
                        node2->A = node1;
                    }
                }
            }
        }
    }
    node *head = mp[0];
    node *temp = head;

    for (int i = 0; i< m; i++)
    {
        node* k = temp;
        if (s[i] == 'A')
        {
            if (temp->A)
            {
                
                if (temp->C)
                {
                    temp->C->A = temp->A;
                    temp->A->C = temp->C;
                }
                else{
                  temp->A->C=NULL;
                }
                if(temp->B){
                   temp->B->D=temp->D;
                 }
                 if(temp->D){
                   temp->D->B=temp->B;
                 }
                temp = temp->A;
              free(k);
            }
        }
        else if (s[i] == 'B')
        {
            if (temp->B)
            {
                

                if (temp->D)
                {
                    temp->D->B = temp->B;
                    temp->B->D = temp->D;
                }
                else{
                  temp->B->D = NULL;
                }
                if(temp->A){
                   temp->A->C=temp->C;
                 }
                 if(temp->C){
                   temp->C->A=temp->A;
                 }
                temp = temp->B;
                
              free(k);
              
            }
        }
        else if (s[i] == 'C')
        {
            if (temp->C)
            {
              if (temp->A)
                {
                    temp->A->C = temp->C;
                    temp->C->A = temp->A;
                }
                else{
                  temp->C->A = NULL;
                }
                if(temp->B){
                   temp->B->D=temp->D;
                 }
                 if(temp->D){
                   temp->D->B=temp->B;
                 }
                temp = temp->C;
                cout<<&temp;
              free(k);
            }
        }
        else
        {
            if (temp->D)
            {

                if (temp->B)
                {
                    temp->B->D = temp->D;
                    temp->D->B = temp->B;
                }
                else{
                  temp->D->B = NULL;
                }

                if(temp->A){
                   temp->A->C=temp->C;
                 }
                 if(temp->C){
                   temp->C->A=temp->A;
                 }
                temp = temp->D;
                 
              free(k);
            }
        }
    }
    cout << temp->x << ' ' << temp->y;
    return 0;
}