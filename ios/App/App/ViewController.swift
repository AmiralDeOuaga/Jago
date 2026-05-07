import UIKit
import Capacitor
import WebKit

class ViewController: CAPBridgeViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        let darkBlue = UIColor(red: 0.094, green: 0.133, blue: 0.212, alpha: 1.0)
        view.backgroundColor = darkBlue
        webView?.isOpaque = false
        webView?.backgroundColor = darkBlue
        webView?.scrollView.backgroundColor = darkBlue
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        webView?.allowsBackForwardNavigationGestures = false
        webView?.scrollView.bounces = false
        webView?.scrollView.alwaysBounceHorizontal = false
        webView?.scrollView.showsHorizontalScrollIndicator = false
    }
}
