class Solution {
public:
    int minimumPushes(string word) {
        vector<int> fq(26, 0);

        for (char ch : word)
            fq[ch - 'a']++;

        sort(fq.begin(), fq.end(), greater<int>());

        int ans = 0;

        for (int i = 0; i < 26; i++) {
            if (fq[i] == 0) break;
            ans += ((i / 8) + 1) * fq[i];
        }

        return ans;
    }
};