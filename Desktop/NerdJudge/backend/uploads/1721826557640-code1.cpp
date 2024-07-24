#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

bool findBalancedSubset(const std::vector<int> &arr, int sum, int n, std::vector<int> &subset)
{

    std::vector<std::vector<bool>> dp(n + 1, std::vector<bool>(sum + 1, false));
    dp[0][0] = true;

    for (int i = 1; i <= n; ++i)
    {
        for (int j = 0; j <= sum; ++j)
        {
            dp[i][j] = dp[i - 1][j];
            if (j >= arr[i - 1])
            {
                dp[i][j] = dp[i][j] || dp[i - 1][j - arr[i - 1]];
            }
        }
    }

    if (!dp[n][sum])
    {
        return false;
    }
    int j = sum;
    for (int i = n; i > 0 && j > 0; --i)
    {
        if (!dp[i - 1][j])
        {
            subset.push_back(arr[i - 1]);
            j -= arr[i - 1];
        }
    }

    std::reverse(subset.begin(), subset.end());
    return true;
}

void findBalancedArrangement(int N, std::vector<int> &result)
{
    std::vector<int> arr(N);
    std::iota(arr.begin(), arr.end(), 1);
    int totalSum = std::accumulate(arr.begin(), arr.end(), 0);

    if (totalSum % 2 != 0)
    {
        return;
    }

    int targetSum = totalSum / 2;
    std::vector<int> firstHalf;

    if (!findBalancedSubset(arr, targetSum, N, firstHalf))
    {
        return;
    }

    std::vector<bool> isInFirstHalf(N + 1, false);
    for (int num : firstHalf)
    {
        isInFirstHalf[num] = true;
    }

    std::vector<int> secondHalf;
    for (int i = 1; i <= N; ++i)
    {
        if (!isInFirstHalf[i])
        {
            secondHalf.push_back(i);
        }
    }

    result = firstHalf;
    result.insert(result.end(), secondHalf.begin(), secondHalf.end());
}

int main()
{
    int N;

    std::cin >> N;

    std::vector<int> result;
    findBalancedArrangement(N, result);

    if (!result.empty())
    {
        for (int num : result)
        {
            std::cout << num << " ";
        }
        std::cout << std::endl;
    }
    else
    {
        std::cout << "No balanced arrangement found." << std::endl;
    }

    return 0;
}
