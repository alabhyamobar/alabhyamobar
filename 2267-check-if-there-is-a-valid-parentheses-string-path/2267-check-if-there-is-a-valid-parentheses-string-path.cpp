class Solution {
public:
    int m, n;
    vector<vector<vector<int>>> dp;

    bool solve(vector<vector<char>>& grid, int r, int c, int balance) {
        if (balance < 0)
            return false;

        if (r >= m || c >= n)
            return false;

        if (grid[r][c] == '(')
            balance++;
        else
            balance--;

        if (balance < 0)
            return false;

        if (r == m - 1 && c == n - 1)
            return balance == 0;

        if (dp[r][c][balance] != -1)
            return dp[r][c][balance];

        bool right = solve(grid, r, c + 1, balance);
        bool down  = solve(grid, r + 1, c, balance);

        return dp[r][c][balance] = (right || down);
    }

    bool hasValidPath(vector<vector<char>>& grid) {
        m = grid.size();
        n = grid[0].size();


        if ((m + n - 1) % 2 != 0)
            return false;

        int maxBalance = m + n;

        dp.assign( m, vector<vector<int>>(n,vector<int>(maxBalance + 1, -1)));

        return solve(grid, 0, 0, 0);
    }
};